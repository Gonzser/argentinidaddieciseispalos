

from odoo import models, fields, api


class MarcaProd(models.Model):
    _inherit = 'product.template'

    brand_id = fields.Many2one('marca.prod', string='Marca')


class BrandProduct(models.Model):
    _name = 'marca.prod'

    name = fields.Char(String="Marca")
    brand_logo = fields.Binary()
    members_ids = fields.One2many('product.template', 'brand_id')
    product_count = fields.Char(String='Cantidad de Productos', compute='get_count_products', store=True)

    @api.depends('members_ids')
    def get_count_products(self):
        self.product_count = len(self.members_ids)


class BrandReportStock(models.Model):
    _inherit = 'stock.quant'

    brand_id = fields.Many2one(related='product_id.brand_id',
                               string='Marca', store=True, readonly=True)
