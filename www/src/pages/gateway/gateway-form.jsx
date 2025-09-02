export default function GatewayFrom({ title, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{title}</h2>
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <input type="submit" value={title} disabled={isLoading ? 'disabled' : ''} />
    </form>
  );
}
