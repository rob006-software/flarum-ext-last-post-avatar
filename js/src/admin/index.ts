/*
 * This file is part of rob006/flarum-ext-last-post-avatar.
 *
 * Copyright (c) 2023 Robert Korulczyk <robert@korulczyk.pl>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import app from 'flarum/admin/app';

app.initializers.add('rob006/flarum-ext-last-post-avatar', () => {
    app.extensionData
        .for('rob006-last-post-avatar')
        .registerSetting({
            setting: 'rob006-last-post-avatar.mode',
            type: 'select',
            options: {
                'all-replies': app.translator.trans('rob006-last-post-avatar.admin.settings.mode.options.all-replies'),
                'non-op-replies': app.translator.trans('rob006-last-post-avatar.admin.settings.mode.options.non-op-replies'),
                'always': app.translator.trans('rob006-last-post-avatar.admin.settings.mode.options.always'),
                'replace-main': app.translator.trans('rob006-last-post-avatar.admin.settings.mode.options.replace-main'),
            },
            label: app.translator.trans('rob006-last-post-avatar.admin.settings.mode.label'),
            help: app.translator.trans('rob006-last-post-avatar.admin.settings.mode.help'),
            default: 'all-replies',
        })
		.registerSetting({
			setting: 'rob006-last-post-avatar.byobu',
			type: 'checkbox',
			label: app.translator.trans('rob006-last-post-avatar.admin.settings.byobu.label')
		});
});
