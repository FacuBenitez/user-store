import { Router } from "express";




export class ImageRoutes {

  static get routes():Router{

    const router = Router();

   router.get('/:type/:img')

    return router
  }


}