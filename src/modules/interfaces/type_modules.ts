import { Request, Response } from "express";

/**
 *  Define a type alias for the callback function
 */
export type ActionCallback = () => void

/**
 *  Define a type alias for the async callback function
 */
export type AsyncCallback = () => Promise<void>

/**
 *  Define a type alias for custom endpoint verification and callback
 */
export type EndpointCallback = (request: Request, response: Response) => Promise<void>