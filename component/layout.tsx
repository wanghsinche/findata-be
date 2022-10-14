import { PropsWithChildren } from 'react'
import { MyFoot } from './foot'
import { MyHead } from './head'

const Layout = ({ children }:PropsWithChildren)=> {
    return (
      <>
        <MyHead />
        <main>{children}</main>
        <MyFoot />
      </>
    )
}

export default Layout