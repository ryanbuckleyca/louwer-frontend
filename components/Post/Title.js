import React from 'react'

const Title = ({ trunc, children, className }) => (
  children ? <h1 className={className} title={children}>
    { children.length > trunc ? children.substr(0, trunc) + '...' : children }
  </h1> : false
)

export default Title
