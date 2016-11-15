import Router from '../../router'
import config from '../../utils/config'
import {createRouter} from '../../spruce'

const app = new Router();

app.use((req, res, next) => {
  res.app = app;
  res.json = (data) => {
    res.body = data;
    res.end()
  };

  res.error = (error) => res.json({error});
  res.app = app;
  next()
});

app.use(async (req, res, next) => {
  const {app} = res;
  const result = await app.request('/account/session', req.body);
  if (result.error || result.user == null) throw 'PERMISSION_DENIED';
  res.session = result;
  next();
});

app.use(createRouter(
  require('./file'),
  require('./host'),
  require('./location')
));


app.use((err, req, res, next) => {
  if (typeof err == 'string') return res.json({error: err});

  if (err.hasOwnProperty('name')) {
    if (err.name == 'ValidationError') return res.json({error: 'PARAM_ILLEGAL'})
  }

  if (err.hasOwnProperty('stack')) {
    if (err.stack.indexOf('Error: Command failed') > -1) return res.json({error: 'COMMAND_FAILED'})
  }

  console.log(err.stack||err);
  return res.json({error: "EXCEPTION_ERROR"})
});

app.use((req, res) => {
  res.json({error: 'NOT_FOUND'})
});

export default module.exports = app