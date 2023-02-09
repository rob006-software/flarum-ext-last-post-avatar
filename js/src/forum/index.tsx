/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import app from 'flarum/forum/app';
import {extend, override} from 'flarum/common/extend';
import TerminalPost from 'flarum/forum/components/TerminalPost';
import avatar from 'flarum/common/helpers/avatar';
import humanTime from 'flarum/common/helpers/humanTime';
import icon from 'flarum/common/helpers/icon';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import Link from 'flarum/common/components/Link';
import Tooltip from 'flarum/common/components/Tooltip';

class MyTerminalPost extends TerminalPost {

    view(vnode) {
        const mode = app.forum.attribute('lastPostAvatarMode');
        const discussion = this.attrs.discussion;

		const isPrivateDiscussion = 'isPrivateDiscussion' in discussion
			&& discussion.isPrivateDiscussion()
			&& app.forum.attribute('lastPostAvatarByobu')

		if (isPrivateDiscussion) {
			super.view(vnode)
			return
		}

        const lastPost = this.attrs.lastPost && discussion.replyCount();

        const user = discussion[lastPost ? 'lastPostedUser' : 'user']();
        const time = discussion[lastPost ? 'lastPostedAt' : 'createdAt']();
        var showAvatar = (mode === 'all-replies' && lastPost)
            || (mode === 'always')
            || (mode === 'non-op-replies' && discussion.lastPostedUser() != discussion.user())

        return (
            <span>
                {lastPost ? icon('fas fa-reply') : ''}{' '}
                {showAvatar ? avatar(user, {className: 'ComposerBody-lastPostAvatar'}) : ''}
                {app.translator.trans('core.forum.discussion_list.' + (lastPost ? 'replied' : 'started') + '_text', {
                    user,
                    ago: humanTime(time),
                })}
            </span>
        );
    }
}

app.initializers.add('rob006/flarum-ext-last-post-avatar', () => {

    extend(DiscussionListItem.prototype, 'infoItems', function (items) {
        if (app.forum.attribute('lastPostAvatarMode') === 'replace-main') {
            return;
        }
        items.replace(
            'terminalPost',
            MyTerminalPost.component({
                discussion: this.attrs.discussion,
                lastPost: !this.showFirstPost(),
            })
        );
    });

    override(DiscussionListItem.prototype, 'view', function (vnode) {
        var content = vnode();
        const discussion = this.attrs.discussion;

        if (
            app.forum.attribute('lastPostAvatarMode') !== 'replace-main'
            || this.showFirstPost() || !discussion.replyCount()
        ) {
            return content;
        }

        const user = discussion.lastPostedUser();

        const replaceAvatar = function (node) {
            if (node && node.children && Array.isArray(node.children)) {
                const container = node.children.find(function (node) {
                    return node && node.attrs && node.attrs.className && String(node.attrs.className).split(' ').includes('DiscussionListItem-content');
                });

                if (container) {
                    container.children.splice(0, 1,
                        <Tooltip
                            text={app.translator.trans('core.forum.discussion_list.replied_text', {
                                user,
                                ago: humanTime(discussion.createdAt())
                            })}
                            position="right"
                        >
                            <Link className="DiscussionListItem-author" href={user ? app.route.user(user) : '#'}>
                                {avatar(user || null, {title: ''})}
                            </Link>
                        </Tooltip>
                    );
                    return;
                }

                node.children.forEach(function (child) {
                    replaceAvatar(child);
                });
            }
        };

        replaceAvatar(content);

        return content;
    });
});
