const request = require('../../tools/request')
const cheerio = require('cheerio')

exports.promocoes = async function(req, reply) {
    let promocoes = await games(req.params.pagina)

    reply.code(200).send({ promocoes })
}

async function games (pagina) {
    let body = await request.get(`https://www.nuuvem.com/catalog/price/promo/sort/bestselling/sort-mode/desc/page/${pagina}.html`)
    const $ = cheerio.load(body)
    let games = []

    return new Promise((resolve, reject) => {
        $('.product-card--grid').each(function (i, elem) {
            let game = {
                nome: $(this).find('.product-title').text().trim(),
                plataformas: $(this).find('.product-os-info').text().trim().split('\n'),
                img: $(this).find('.product-img').find('img').eq(0).attr('src'),
                url_nuuvem: $(this).find('.product-card--wrapper').eq(0).attr('href').trim(),
                valor: {
                    antigo: $(this).find('.product-price--val').eq(0).find('.product-price--old').text().trim(),
                    novo_integer: $(this).find('.product-price--val').eq(0).find('.integer').text().trim(),
                    novo_decimal: $(this).find('.product-price--val').eq(0).find('.decimal').text().trim()
                }
            }
            games.push(game)
        })

        return resolve(games)
    })
}
