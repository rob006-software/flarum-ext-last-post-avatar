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

return [
	(new Extend\Frontend('forum'))
		->js(__DIR__ . '/js/dist/forum.js')
		->css(__DIR__ . '/less/forum.less'),
	(new Extend\Frontend('admin'))
		->js(__DIR__ . '/js/dist/admin.js')
		->css(__DIR__ . '/less/admin.less'),
	// new Extend\Locales(__DIR__ . '/locale'),
];
