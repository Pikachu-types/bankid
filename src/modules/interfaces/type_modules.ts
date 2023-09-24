import { Request, Response } from "express";
import { ConsoleUser, ConsumerUserReference } from "../models/portal/consoleuser";
import { ConsumerModel } from "../models/public/consumers";
import { ClientApp } from "../models/portal/apps";
import { IdentificationModel } from "../models/public/users";

/**
 *  Define a type alias for the callback function
 */
export type ActionCallback = () => void

/**
 *  Define a type alias for the async callback function
 */
export type AsyncCallback = () => Promise<unknown>

/**
 *  Define a type alias for custom endpoint verification and callback
 */
export type EndpointCallback = (request: Request,
    response: Response) => Promise<unknown>

/**
 * BankID Account type
 */
export type BAccount = ConsoleUser | ConsumerModel | ClientApp |
    IdentificationModel | ConsumerUserReference;
