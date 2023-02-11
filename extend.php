<?php

/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace rob006\flarum\lastPostAvatar;

use Flarum\Extend;
use rob006\flarum\lastPostAvatar\entities\Mode;

return [
	(new Extend\Frontend('forum'))
		->js(__DIR__ . '/js/dist/forum.js')
		->css(__DIR__ . '/less/forum.less'),

	(new Extend\Frontend('admin'))
		->js(__DIR__ . '/js/dist/admin.js')
		->css(__DIR__ . '/less/admin.less'),

	(new Extend\Settings())
		->default('rob006-last-post-avatar.ignorePrivateDiscussions', false)
		->serializeToForum('lastPostAvatarIgnorePrivateDiscussions', 'rob006-last-post-avatar.ignorePrivateDiscussions', 'boolval')
		->serializeToForum('lastPostAvatarMode', 'rob006-last-post-avatar.mode', static function ($value) {
			if (!is_string($value) || !in_array($value, Mode::getModes(), true)) {
				$value = Mode::DEFAULT;
			}

			return $value;
		}),

	new Extend\Locales(__DIR__ . '/locale'),
];
