# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = 'pos.order'

    hasarcf_ok = fields.Boolean(string='Hasar CF State', default=False,  copy=False,  help='Is Available Hasar CF communications, OK.')
    tiquet_cf = fields.Char(string='Tiquet CF', default='x defesto', copy=False, help='eg. 00001-0000000001')

    @api.model
    def _order_fields(self, ui_order):
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        order_fields['hasarcf_ok'] = ui_order.get('hasarcf_ok')
        order_fields['tiquet_cf'] = ui_order.get('tiquet_cf')
        return order_fields
