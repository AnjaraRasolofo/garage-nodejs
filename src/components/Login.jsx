import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      
      <div className="card shadow p-4" style={{ width: "400px" }}>
        
        <h3 className="mb-4 text-center border-bottom pb-2">
          Connexion
        </h3>

        <form onSubmit={handleSubmit} className="row g-3">

          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="ex: admin@garage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="col-12">
              <div className="alert alert-danger py-2 mb-0">
                {error}
              </div>
            </div>
          )}

          <div className="col-12 d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}