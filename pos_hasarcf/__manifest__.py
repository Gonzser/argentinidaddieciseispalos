# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'Point of Sale Hasar CF',
    'version': '15.0.2',
    'category': 'Sales/Point of Sale',
    'sequence': 6,
    'summary': 'Simple Fiscal Control Printer Hasar, Point of Sale ',
    'description': """Simple Fiscal Control Printer Hasar, Point of Sale. 

This module allows to comunicate and print fiscal documents in Hasar CF250 v2.0, 
in this early version 'v15.0.2' simple print the complete order ones it is validate and finalized.

""",
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_hasarcf_views.xml',
        'security/ir.model.access.csv',
        ],
    'installable': True,
    'assets': {
        'point_of_sale.assets': [
            'pos_hasarcf/static/src/js/**/*',
        ],
        'web.assets_qweb': [
            'pos_hasarcf/static/src/xml/**/*',
        ],
    },
    'license': 'LGPL-3',
}
