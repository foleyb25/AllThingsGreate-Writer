'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('create-blog-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        loading: false,
        disabled: true,
        bodyText: '',
        category: '',
        titleText: '',
        imageFile: undefined,
        pickedFileSrc: ''
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function beforeMount() {
        // Attach any initial data from the server.
        _.extend(this, SAILS_LOCALS);
    },
    mounted: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function mounted() {
            return _ref.apply(this, arguments);
        }

        return mounted;
    }(),

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {

        handleFileChange: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
                var file, extension, imageSrc;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                file = event.target.files[0];

                                this.pickedFileSrc = file.name;

                                extension = filename.split('.').pop();

                                if (!(extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png' || extension.toLowerCase() == 'gif' || extension.toLowerCase() == 'jpeg')) {
                                    _context2.next = 11;
                                    break;
                                }

                                document.getElementById('create-btn').disabled = false;
                                document.getElementById('notify-box').innerHTML = '';
                                imageSrc = window.URL.createObjectURL(file);

                                document.getElementById("selectedImage").src = imageSrc;
                                return _context2.abrupt('return', true);

                            case 11:
                                document.getElementById('create-btn').disabled = true;
                                document.getElementById('notify-box').innerHTML = "<p style='color:red;'>Please select .jpeg, .jpg, .gif, .png extension</p>";
                                return _context2.abrupt('return', false);

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleFileChange(_x) {
                return _ref2.apply(this, arguments);
            }

            return handleFileChange;
        }(),

        clearContents: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                $('#screenplayList div').empty();
                                this.pageNum = 0;

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function clearContents() {
                return _ref3.apply(this, arguments);
            }

            return clearContents;
        }(),

        submitReview: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var formData, result;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                formData = new FormData();

                                formData.append('screenplay', JSON.stringify(this.screenplay));
                                formData.append('rating', this.value);
                                formData.append('blog_url', this.blog_url);
                                _context4.prev = 4;

                                this.loading = true;
                                _context4.next = 8;
                                return axios.put('/review/submit', formData);

                            case 8:
                                result = _context4.sent;

                                this.loading = false;
                                this.is_submitted = result.data.is_submitted;
                                this.is_10_and_blog_blank = result.data.is_10_and_blog_blank;
                                this.need_www = result.data.need_www;
                                this.invalid_url = result.data.invalid_url;
                                _context4.next = 20;
                                break;

                            case 16:
                                _context4.prev = 16;
                                _context4.t0 = _context4['catch'](4);

                                this.loading = false;
                                console.error(_context4.t0.toString());

                            case 20:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 16]]);
            }));

            function submitReview() {
                return _ref4.apply(this, arguments);
            }

            return submitReview;
        }()
    },
    computed: {
        total: function total() {
            return this.value;
        },

        url_value: function url_value() {
            return this.blog_url;
        }

    }
});
