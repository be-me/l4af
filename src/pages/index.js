import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { render } from 'react-dom'
import Styles from './Styles'
import Spinner from './Spinner'
import { Form, Field } from 'react-final-form'
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />
      <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
      <Link to="/using-dsg">Go to "Using DSG"</Link>
    </p>
  </Layout>
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const verifyUsername = async values => {
  await sleep(400)
  if (
    ~['john', 'paul', 'george', 'ringo'].indexOf(
      values.username && values.username.toLowerCase()
    )
  ) {
    return { username: 'Username taken!' }
  }
}

const App = () => (
  <Styles>
    <h1>🏁 React Final Form Example</h1>
    <h2>Hybrid Synchronous/Asynchronous Record-Level Validation</h2>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">
      Read Docs
    </a>
    <div>Usernames John, Paul, George or Ringo will fail async validation.</div>
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors = {}
        if (!values.username) {
          errors.username = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        if (!values.confirm) {
          errors.confirm = 'Required'
        } else if (values.confirm !== values.password) {
          errors.confirm = 'Does not match'
        }
        return Object.keys(errors).length ? errors : verifyUsername(values)
      }}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        validating,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          {validating && <Spinner />}
          <Field name="username">
            {({ input, meta }) => (
              <div>
                <label>Username</label>
                <input {...input} type="text" placeholder="Username" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input {...input} type="password" placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="confirm">
            {({ input, meta }) => (
              <div>
                <label>Confirm</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Confirm password"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting || validating}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </Styles>
)

render(<App />, document.getElementById('root'))

export default IndexPage, App
