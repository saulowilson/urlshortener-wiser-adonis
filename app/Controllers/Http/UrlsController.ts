import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Url from 'App/Models/Url'
import randomSlug from '../../../utils/generateRandomString'
import { DateTime } from 'luxon'

export default class UrlsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const originalUrl = request.input('url')
      if (!originalUrl)
        return response.status(400).json({ error: 'Please provide an url to short' })

      const urlModel = await Url.findBy('original_url', originalUrl)
      if (urlModel)
        return response.status(200).json({ newUrl: 'http://127.0.0.1:3333/' + urlModel.new_url })

      //Create a random slug url with default lengths: min = 5 and max = 10
      const randomSlugUrl = randomSlug()

      //Create a expiration date of 2 days from now
      const expirationDate = DateTime.now().setZone('America/Recife').plus({ days: 2 })

      const createNewUrl = new Url()
      const shortenedUrl = {
        original_url: originalUrl,
        new_url: `${randomSlugUrl}`,
        expiration_date: expirationDate,
      }
      createNewUrl.fill(shortenedUrl)
      await createNewUrl.save()

      return response.status(201).json({ newUrl: 'http://127.0.0.1:3333/' + shortenedUrl.new_url })
    } catch (error) {
      console.error({ error })
      return response.status(500).json({ message: 'Ops! An error happened.', error })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const { newUrl } = params
      const urlModel = await Url.find(newUrl)
      if (!urlModel) return response.status(404).json({ message: 'Url provided not found' })

      //console.log(urlModel.expiration_date.diff()))
      console.info(urlModel.expiration_date.diffNow('days').days)
      const isUrlExpired = urlModel.expiration_date.diffNow('days').days > 2
      console.log(isUrlExpired)
      if (isUrlExpired) return response.status(404).json({ message: 'Url provided expired' })

      //http://127.0.0.1:3333/942bk2f4

      return response.redirect(urlModel.original_url)
    } catch (error) {
      return response.status(500).json({ message: 'Ops! An error happened.', error })
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
