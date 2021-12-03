/*eslint-disable */
/* prettier-ignore */
F.Stream = F.Class.extend({
    options: {
        title: "F.Stream",

        protocol: 'rtsp',
        ipAddress: undefined,
        port: '554',
        login: 'admin',
        password: 'fizmasoft7998872',
        path: '/Streaming/Channels/2',
        face: false,
        ptz: 0,

        position: {
            x: 0,
            y: 0
        },

        size: {
            w: 800,
            h: 600
        }
    },

    initialize: function(options) {
        F.setOptions(this, options);

        if (this.options.ipAddress === undefined)
            throw 'IP Address is undefined';

        this._args = [];

        this._isValid = F.Browser.FS;

        this._args.push(this.options.title);
        this._args.push(`${this.options.protocol}://${this.options.login}:${this.options.password}@${this.options.ipAddress}:${this.options.port}${this.options.path}`);
        this._args.push(`${this.options.position.x}x${this.options.position.y}`);
        this._args.push(`${this.options.size.w}x${this.options.size.h}`);
        this._args.push(this.options.face);
        this._args.push(this.options.ptz);
    },

    play: function() {
        if (this._isValid === true) {
            fMedia.Stream(...this._args);
        }
    },

    playback: function( channel, start, end) {
        const {ipAddress, port, login, password } = this.options
        if (this._isValid === true) {
          fMedia.PlayBack(ipAddress, port, login, password, channel, 1, start, end)
        }
    }
});

F.stream = function (options) {
  return new F.Stream(options)
}
