import React from "react"
import PropTypes from "prop-types"

import Theme from "../Theme"
import Layout from "../Layout"

const App = ({ children }) => (
    <Theme>
        <Layout>
            {children}
        </Layout>
    </Theme>
)

App.propTypes = {
    children: PropTypes.node.isRequired
}

export default App