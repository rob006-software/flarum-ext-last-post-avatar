CHANGELOG
=========


2.0.0 (2026-05-03)
------------------

* Add Flarum 2.0 compatibility. (@rob006)


All changes: [1.3.0...2.0.0](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.3.0...2.0.0).


1.3.0 (2026-05-03)
------------------

* Updated the extension to use the new view hooks API introduced in Flarum 1.8. This refactoring improves compatibility with other extensions by using more specific hooks instead of overriding large parts of the view. While there are no visible changes to the user experience, it ensures a more robust and stable implementation. As a result of these changes, the minimum required Flarum version has been increased to 1.8. (@rob006)


All changes: [1.2.4...1.3.0](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.2.4...1.3.0).


1.2.4 (2023-04-01)
------------------

* Remove empty translations as they emit deprecation warnings on PHP 8.2. (@garygreen)


All changes: [1.2.3...1.2.4](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.2.3...1.2.4).


1.2.3 (2023-03-14)
------------------

* Fix occasional duplicated avatars when "Only replies except posts of discussion author" mode is enabled. (@rob006)


All changes: [1.2.2...1.2.3](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.2.2...1.2.3).


1.2.2 (2023-02-12)
------------------

* Improve compatibility with other extensions. (@rob006)


All changes: [1.2.1...1.2.2](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.2.1...1.2.2).


1.2.1 (2023-02-11)
------------------

* Fixed reply time displayed when "Replace main discussion avatar" mode is enabled. (@rob006)


All changes: [1.2.0...1.2.1](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.2.0...1.2.1).


1.2.0 (2023-02-11)
------------------

* Added option to disable altering avatars for private discussions handled by `fof/byobu`. (@Nearata)
* Added `reply-avatar` CSS class for avatars inherited from last reply. (@rob006)


All changes: [1.1.0...1.2.0](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.1.0...1.2.0).


1.1.0 (2023-02-07)
------------------

* Added support for different display modes. (@rob006)


All changes: [1.0.0...1.1.0](https://github.com/rob006-software/flarum-ext-last-post-avatar/compare/1.0.0...1.1.0).


1.0.0 (2023-02-06)
------------------

Initial release. (@rob006)
