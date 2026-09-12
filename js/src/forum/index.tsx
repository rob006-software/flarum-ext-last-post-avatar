/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import TerminalPost from 'flarum/forum/components/TerminalPost';
import Avatar from 'flarum/common/components/Avatar';
import humanTime from 'flarum/common/helpers/humanTime';
import humanTimeText from 'flarum/common/utils/humanTime';
import Icon from 'flarum/common/components/Icon';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import Link from 'flarum/common/components/Link';
import Tooltip from 'flarum/common/components/Tooltip';

class MyTerminalPost extends TerminalPost {

	view() {
		const mode = app.forum.attribute('lastPostAvatarMode');
		const discussion = this.attrs.discussion;
		const lastPost = this.attrs.lastPost && discussion.replyCount();

		const user = discussion[lastPost ? 'lastPostedUser' : 'user']();
		const time = discussion[lastPost ? 'lastPostedAt' : 'createdAt']();
		var showAvatar = (mode === 'all-replies' && lastPost)
			|| (mode === 'always')
			|| (mode === 'non-op-replies' && lastPost && discussion.lastPostedUser() != discussion.user())
		showAvatar &&= !app.forum.attribute('lastPostAvatarIgnorePrivateDiscussions') || !discussion.isPrivateDiscussion?.();

		return (
			<span>
				{lastPost ? <Icon name="fas fa-reply"/> : ''}{' '}
				{showAvatar ?
					<Avatar user={user} className={'ComposerBody-lastPostAvatar' + (lastPost ? ' reply-avatar' : '')}/> : ''}
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

		const terminalPost = (
			<MyTerminalPost
				discussion={this.attrs.discussion}
				lastPost={!this.showFirstPost()}
			/>
		);

		if (items.has('terminalPost')) {
			items.setContent('terminalPost', terminalPost);
		} else {
			items.add('terminalPost', terminalPost);
		}
	});

	extend(DiscussionListItem.prototype, 'authorItems', function (items) {
		const discussion = this.attrs.discussion;
		const lastPost = !this.showFirstPost() && discussion.replyCount();

		if (
			app.forum.attribute('lastPostAvatarMode') !== 'replace-main'
			|| (app.forum.attribute('lastPostAvatarIgnorePrivateDiscussions') && discussion.isPrivateDiscussion?.())
			|| !lastPost
		) {
			return;
		}

		const user = discussion.lastPostedUser();
		const avatar = (
			<Tooltip
				text={app.translator.trans('core.forum.discussion_list.replied_text', {
					user,
					ago: humanTimeText(discussion.lastPostedAt()),
				})}
				position="right"
			>
				<Link className="DiscussionListItem-author-avatar" href={user ? app.route.user(user) : '#'}>
					<Avatar user={user}/>
				</Link>
			</Tooltip>
		);

		if (items.has('avatar')) {
			items.setContent('avatar', avatar);
		} else {
			items.add('avatar', avatar);
		}
	});
});
