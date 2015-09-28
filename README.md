# the-done-list

Unlike ToDo lists, use The Done List to keep track of everything you've done.

The unfortunate side-effect of to-do lists is that they're always telling
you that there are things you haven't done. The done list ameliorates that
effect showing you that you are, in fact, getting a lot done.

Goal: To help procrastinators [forgive themselves][1] and free themselves
from that role they've internalized over the years, getting them into a
positive cycle of increased productivity.

[Inspiration][2]

[1]: http://digest.bps.org.uk/2010/05/cure-for-procrastination-forgive.html
[2]: https://news.ycombinator.com/item?id=10271090

# development

React-native is used for the mobile app. To get things running on Android:

1) Follow the [android setup instructions](https://facebook.github.io/react-native/docs/android-setup.html#content)

2) Run `npm install` from this directory

3) Make sure to `export ANDROID_HOME=SDK_PATH`

4) Run the emulator or connect a device, and run `npm watch`