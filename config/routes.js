/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage' },

  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },
  'GET /faq':                { action:   'view-faq' },

  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },
  'GET /email/confirmed/sent':    { action: 'entrance/send-confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

  // CUSTOM ROUTING

  //          BLOG
  //CRUD
  'POST /blog':                 'blog/create',      
  'DELETE /blog/:blogId':       'blog/delete',
  'PUT /blog/approve': 'blog/approve',
  'PUT /blog/unapprove': 'blog/unapprove',
  'PUT /blog/archive': 'blog/archive',
  'PUT /blog/unarchive': 'blog/unarchive',
  'POST /blog/update/:blogId':  'blog/update',

  //VIEWS
  'GET /blog/create':           'blog/view-create', 
  'GET /blog/edit/:blogId':     'blog/view-edit',
  'GET /blog/review':           'blog/view-review',
  'PUT /paginate-home':         'paginate-homepage',
  'PUT /paginate-rev':          'paginate-review',
  'GET /blog/review/:blogId':   'blog/view-review-single-blog',
  

  //          WRITER
  //CRUD
  'POST /profile':              'writer/update',

  //VIEWS
  'GET /profile':               'writer/view-profile',
  'GET /search/screenplay':           'search/search-screenplay-view',
  'GET /review/screenplay/:imdb_id':           'review/review-screenplay-view',
  'GET /user/:id':              'writer/publicprofile',
  'PUT /search/screenplay/query':     'search/search-screenplay',
  'PUT /review/submit':         'review/submit',
  
 //CRUD
 // 'DELETE /comment/delete/:commentid': {action:'comment/delete', csrf:false}
  
};
