import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';

import { ErrorHandler } from '../../errors';
import { validateTokenMiddleware } from '../../middlewares';

describe('Token validation middleware test | Unit', () => {
  const mockRequest: Partial<Request> & JwtPayload = {};
  const _: Partial<Response> = {};
  const mockNextFunction: NextFunction = jest.fn();

  test('Error: missing authorization token | Status: 401', () => {
    mockRequest.headers = {};

    try {
      validateTokenMiddleware(
        mockRequest as Request,
        _ as Response,
        mockNextFunction as NextFunction
      );
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('missing authorization token');
    }
  });

  test('Error: jwt must be provided | Status: 401', () => {
    mockRequest.headers = {
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    };

    try {
      validateTokenMiddleware(
        mockRequest as Request,
        _ as Response,
        mockNextFunction as NextFunction
      );
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('jwt must be provided');
    }
  });

  test('Success: Will call NextFunction and add decoded key in mockRequest object', () => {
    const email = 'costanzageorge@seinfeld.com';
    const authToken = sign({ email }, process.env.SECRET_KEY as string);
    mockRequest.headers = {
      authorization: `Bearer ${authToken}`,
    };

    validateTokenMiddleware(
      mockRequest as Request,
      _ as Response,
      mockNextFunction as NextFunction
    );
    expect(mockNextFunction).toBeCalled();
    expect(mockNextFunction).toBeCalledTimes(1);
    expect(mockRequest).toHaveProperty('decoded');
    expect(mockRequest.decoded.email).toStrictEqual(email);
  });
});
