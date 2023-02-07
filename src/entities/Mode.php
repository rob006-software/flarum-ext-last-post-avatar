<?php

/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace rob006\flarum\lastPostAvatar\entities;

/**
 * Class Mode.
 *
 * @author Robert Korulczyk <robert@korulczyk.pl>
 */
class Mode {

	public const DEFAULT = self::ALL_REPLIES;

	public const ALL_REPLIES = 'all-replies';
	public const NON_OP_REPLIES = 'non-op-replies';
	public const ALWAYS = 'always';
	public const REPLACE_MAIN = 'replace-main';

	public static function getModes(): array {
		return [
			self::ALL_REPLIES,
			self::NON_OP_REPLIES,
			self::ALWAYS,
			self::REPLACE_MAIN,
		];
	}
}
