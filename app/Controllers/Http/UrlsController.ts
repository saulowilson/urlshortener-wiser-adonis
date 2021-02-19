import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Url from 'App/Models/Url'
import { createRandomCharacters } from '../../../utils/generateRandomString'

const APP_URL = process.env.APP_URL || 'http://localhost:8081'
export default class UrlsController {
  public async index({ response }: HttpContextContract) {
    return response.send('Wiser URL Shortened API')
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const originalUrl: string = request.input('url')
      if (!originalUrl)
        return response.status(400).json({ error: 'Please provide an url to short' })

      //If find original_url return in db, return it.
      const urlModel = await Url.findBy('original_url', originalUrl)

      if (urlModel) return response.status(201).json({ newUrl: `${APP_URL}/${urlModel.new_url}` })

      //Create a random characters with default lengths: min = 5 and max = 10
      const randomCharacters = createRandomCharacters()

      const createNewUrl = new Url()
      const shortenedUrl = {
        original_url: originalUrl,
        new_url: `${randomCharacters}`,
      }
      createNewUrl.fill(shortenedUrl)
      await createNewUrl.save()

      return response.status(201).json({ newUrl: `${APP_URL}/${shortenedUrl.new_url}` })
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

      const isUrlExpired = urlModel.createdAt.diffNow('days').days > 2
      if (isUrlExpired) return response.status(404).json({ message: 'Url provided is expired' })

      return response.redirect(urlModel.original_url, false, 302)
    } catch (error) {
      console.error({ error })
      return response.status(500).json({ message: 'Ops! An error happened.', error })
    }
  }
}
