# -*- coding: utf-8 -*-
{
    'name': "bdss_marca",

    'summary': """
        La Marca, una simple gestion de la marca en los productos""",

    'description': """
        La Marca es una implementacion basica del concepto 
        de Marca de Producto, que no puede ser tratado como 
        una etiqueta ni como una categoria mas.
        La gestion de Marca es necesaria para comercial
        logistica e inclusive el website. 
        La Marca trasciende el concepto de producto. 
    """,

    'author': "bdss.dev",
    'website': "http://odoo.bdss.dev",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Sales',
    'version': '15.0.1',

    # any module necessary for this one to work correctly
    'depends': ['stock'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        # 'views/templates.xml',
    ],
    # only loaded in demonstration mode
    #'demo': [
    #    'demo/demo.xml',
    #],

    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
