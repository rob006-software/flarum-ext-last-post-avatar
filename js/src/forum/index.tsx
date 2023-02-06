/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import app from 'flarum/common/app';
import {extend} from 'flarum/common/extend';
import TerminalPost from 'flarum/forum/components/TerminalPost';
import avatar from 'flarum/common/helpers/avatar';
import humanTime from 'flarum/common/helpers/humanTime';
import icon from 'flarum/common/helpers/icon';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';

class MyTerminalPost extends TerminalPost {

    view() {
        const discussion = this.attrs.discussion;
        const lastPost = this.attrs.lastPost && discussion.replyCount();

        const user = discussion[lastPost ? 'lastPostedUser' : 'user']();
        const time = discussion[lastPost ? 'lastPostedAt' : 'createdAt']();

        return (
            <span>
                {lastPost ? icon('fas fa-reply') : ''}{' '}
                {lastPost ? avatar(user, {className: 'ComposerBody-lastPostAvatar'}) : ''}
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
        items.replace(
            'terminalPost',
            MyTerminalPost.component({
                discussion: this.attrs.discussion,
                lastPost: !this.showFirstPost(),
            })
        );
    });
});
