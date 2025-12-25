import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/api-client";

const ActivateAccount = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const {uid, token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
        .post("/auth/users/activation/", { uid, token })
        .then(() => {
            setMessage("Your account has been activated successfully!");
            setTimeout(() => navigate("/login"), 3500);
        })
        .catch(() => {
            setError("Something went wrong. Please check your activation link.");
        })
        .finally(() => {
            setLoading(false);
        });
  }, [uid, token, navigate]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Account Activation</h1>

        {loading && (
          <div className="flex justify-center py-6">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        )}

        {!loading && message && (
          <p className="text-xl font-semibold text-green-600 text-center">
            {message}
          </p>
        )}

        {!loading && error && (
           <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {!loading && !message && !error && (
          <p className="text-center text-sm text-gray-500 mt-4">Awaiting activation response...</p>
        )}
      </div>
    </div>
    );
};

export default ActivateAccount;