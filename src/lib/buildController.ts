import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export { buildController };

function buildController<bodyT>(
    controller: (body: bodyT) => any,
    options?: {
        schema?: Joi.Schema;
        checkAuthorization?: (headers: Record<string, string>, body: Object) => boolean;
    },
) {
    return async (req: Request, res: Response) => {
        if (options?.checkAuthorization) {
            try {
                await options.checkAuthorization(req.headers as any, req.body);
            } catch (error) {
                console.error(error);
                res.sendStatus(httpStatus.UNAUTHORIZED);
                return;
            }
        }

        if (options?.schema) {
            const { error } = options.schema.validate(req.body);
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller(req.body);
            res.set('Content-Type', 'application/json');
            if (result === undefined) {
                res.send({});
            } else {
                res.send(result);
            }
            return;
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
