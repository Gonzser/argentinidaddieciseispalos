# -*- coding: utf-8 -*-
from odoo import http

# class ProxyController(http.Controller):
#     @http.route('/hw_proxy/hello', type='http', auth='none', cors='*')
#     def hello(self):
#         return "ping"

    # @http.route('/hw_proxy/handshake', type='json', auth='none', cors='*')
    # def handshake(self):
    #     return True

class POSHasar(http.Controller):
    @http.route(['/pos/web', '/pos/ui'], type='http', auth='none', cors='*', csrf=False)
    # @http.route('/pos/ui', type='http', auth='none', cors='*', csrf=False)
    def index(self, **kw):
        return "Hello, world"

    @http.route(['/pos/web', '/pos/ui'], type='json', auth='none', cors='*')
    def handshake(self):
        return True

#     @http.route('/bdss_arqueo/bdss_arqueo/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('bdss_arqueo.listing', {
#             'root': '/bdss_arqueo/bdss_arqueo',
#             'objects': http.request.env['bdss_arqueo.bdss_arqueo'].search([]),
#         })

#     @http.route('/bdss_arqueo/bdss_arqueo/objects/<model("bdss_arqueo.bdss_arqueo"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('bdss_arqueo.object', {
#             'object': obj
#         })

    #
    # @http.route('/clear_credential', type='http', auth='none', cors='*', csrf=False)
    # def clear_credential(self):
    #     helpers.unlink_file('odoo-db-uuid.conf')
    #     helpers.unlink_file('odoo-enterprise-code.conf')
    #     subprocess.check_call(["sudo", "service", "odoo", "restart"])
    #     return "<meta http-equiv='refresh' content='20; url=http://" + helpers.get_ip() + ":8069'>"

# @http.route(['/pos/web', '/pos/ui'], type='http', auth='user')
#     def pos_web(self, config_id=False, **k):
        # """Open a pos session for the given config.
        #
        # The right pos session will be selected to open, if non is open yet a new session will be created.
        #
        # /pos/ui and /pos/web both can be used to acces the POS. On the SaaS,
        # /pos/ui uses HTTPS while /pos/web uses HTTP.
        #
        # :param debug: The debug mode to load the session in.
        # :type debug: str.
        # :param config_id: id of the config that has to be loaded.
        # :type config_id: str.
        # :returns: object -- The rendered pos session.
        # """
        # domain = [
        #         ('state', 'in', ['opening_control', 'opened']),
        #         ('user_id', '=', request.session.uid),
        #         ('rescue', '=', False)
        #         ]
        # if config_id:
        #     domain = AND([domain,[('config_id', '=', int(config_id))]])
        # pos_session = request.env['pos.session'].sudo().search(domain, limit=1)
        #
        # # The same POS session can be opened by a different user => search without restricting to
        # # current user. Note: the config must be explicitly given to avoid fallbacking on a random
        # # session.
        # if not pos_session and config_id:
        #     domain = [
        #         ('state', 'in', ['opening_control', 'opened']),
        #         ('rescue', '=', False),
        #         ('config_id', '=', int(config_id)),
        #     ]
        #     pos_session = request.env['pos.session'].sudo().search(domain, limit=1)
        #
        # if not pos_session:
        #     return request.redirect('/web#action=point_of_sale.action_client_pos_menu')
        # # The POS only work in one company, so we enforce the one of the session in the context
        # company = pos_session.company_id
        # session_info = request.env['ir.http'].session_info()
        # session_info['user_context']['allowed_company_ids'] = company.ids
        # session_info['user_companies'] = {'current_company': company.id, 'allowed_companies': {company.id: session_info['user_companies']['allowed_companies'][company.id]}}
        # context = {
        #     'session_info': session_info,
        #     'login_number': pos_session.login(),
        # }
        # response = request.render('point_of_sale.index', context)
        # response.headers['Cache-Control'] = 'no-store'
        # return response