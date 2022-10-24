# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models

class PosConfig(models.Model):
    _inherit = 'pos.config'

    iface_hasarcf = fields.Boolean(string='Hasar CF Connected', help='Available Hasar CF communications.')
    hasarcf_ip = fields.Char(string='IP connected', default='http://192.168.1.129/fiscal.json', help='eg. http://192.168.1.129/')
