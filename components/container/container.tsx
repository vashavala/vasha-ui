export type ContainerType = {
  containerClassNames?: string
  header?: React.ReactNode
  children: React.ReactNode
  mainSectionClassNames?: string
  footer?: React.ReactNode
}

const Container = (props: ContainerType) => {
  const { containerClassNames, header, children, mainSectionClassNames, footer } = props
  return (
    <div className={`w-screen h-screen ${containerClassNames}`}>
      {header && header}
      <main className={`size-full ${mainSectionClassNames}`}> {children} </main>
      {footer && footer}
    </div>
  )
}

export default Container