function routerHandlerWrapper(action: (req, res) => Promise<any>, requireAuth: boolean) {
  return async (req, res, next) => {
    if (requireAuth && !req.user) {
      return res.status(401).send('UNAUTHORIZED');
    }
    try {
      const result = await action(req, res);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export { routerHandlerWrapper };
