
const Express = require('express')
const CookieParser = require('cookie-parser')
const Seneca = require('seneca')


const PORT = {
  express: 51600
}


const seneca = new Seneca({legacy:false})
      .test('print')
      .use('promisify')
      .use('entity')
      .use('repl')
      .use('gateway$public', {
        allow: {
          'aim:req': true,
        }
      })
      .use('gateway-express$public', {})

      // .use('gateway$private', {})
      // .use('gateway-express$private', {
      //  auth: { token: { name: 'seneca-redux-app-auth-example' } }
      // })
      // .use(
      //   'gateway-auth$private',
      //   {
      //     spec: {
      //       express_cookie: {
      //         active: true,
      //         user: { auth: true, require: true }
      //       }
      //     }
      //   }
      // )

      .use(function count() {
        const seneca = this
        
        seneca.message('aim:count,cmd:incr', { incr: Number }, async function(msg) {
          return {ok:true,incr:msg.incr}
        })

      })

      .use(function api() {
        const seneca = this
        
        seneca.message('aim:req,on:count,cmd:incr', async function(msg) {
          let res = await this.post('aim:count,cmd:incr', {incr:msg.incr})
          if(!res.ok) {
            return {ok:false,why:res.why}
          }
          return {
            ok:true,
            incr: res.incr
          }
        })

        seneca
          .fix('aim:req,on:entity')
          .message('cmd:save', async function save(msg) {
            return {
              ok: true,
              ent: (await this.entity(msg.canon).save$(msg.ent)).data$(),
            }
          })
          .message('cmd:load', async function save(msg) {
            return {
              ok: true,
              ent: (await this.entity(msg.canon).load$(msg.q))?.data$(),
            }
          })
          .message('cmd:list', async function save(msg) {
            // throw new Error('qqq')
            return {
              ok: true,
              list: (await this.entity(msg.canon).list$(msg.q)).map((n) =>
                n.data$(),
              ),
            }
          })
          .message('cmd:remove', async function remove(msg) {
            return {
              ok: true,
              ent: (await this.entity(msg.canon).remove$(msg.q))?.data$(),
            }
          })
      })


      .ready(async function() {
        const seneca = this

        console.log('aim:count,cmd:incr',
                    await seneca.post('aim:count,cmd:incr,incr:1'))

        console.log('aim:req,on:count,cmd:incr',
                    await seneca.post('aim:req,on:count,cmd:incr,incr:1'))

        runExpress(seneca)
      })


function runExpress(seneca) {
  const app = Express()

  app
    .use(Express.json())
    .use(new CookieParser())
    .post(
      '/api/public/:end',
      seneca.export('gateway-express$public/handler')
    )
    // .post(
    //   '/api/private/:end',
    //   seneca.export('gateway-express$private/handler')
    // )
    .listen(PORT.express)

}
