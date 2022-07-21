'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

parasails.registerPage('search-screenplay-view', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    screenplayList: window.SAILS_LOCALS.screenplayList,
    morescreenplays: window.SAILS_LOCALS_morescreenplays,
    pageNum: 0,
    isMore: window.SAILS_LOCALS.isMore,
    noResults: window.SAILS_LOCALS.noResults,
    loading: false
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

    clearContents: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                $('.screenplay-list-js div').empty();
                this.pageNum = 0;
                this.isMore = false;

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function clearContents() {
        return _ref2.apply(this, arguments);
      }

      return clearContents;
    }(),

    search: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var searchString, formData, nextPage, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchString = document.querySelector("input[name=search]").value;
                formData = new FormData();
                nextPage = this.pageNum + 1;


                formData.append('searchString', searchString);
                formData.append('pageNum', nextPage);
                _context3.prev = 5;

                this.loading = true;
                _context3.next = 9;
                return axios.put('/search/screenplay/query', formData);

              case 9:
                res = _context3.sent;

                this.loading = false;
                this.morescreenplays = res.data.morescreenplays;
                if (this.screenplayList != undefined) {
                  this.screenplayList.push.apply(this.screenplayList, res.data.morescreenplays);
                } else {
                  this.screenplayList = res.data.screenplayList;
                }
                this.pageNum = nextPage;
                this.isMore = res.data.isMore;
                this.noResults = res.data.noResults;

                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3['catch'](5);

                this.loading = false;
                console.error(_context3.t0.toString());

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 18]]);
      }));

      function search() {
        return _ref3.apply(this, arguments);
      }

      return search;
    }()
  }
});
