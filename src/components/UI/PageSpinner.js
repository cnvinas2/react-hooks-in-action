import Spinner from './Spinner'

export default function PageSpinner() {
  return (
    <p className="page-loading">
      <Spinner data-testid="spinner" />
    </p>
  )
}
