import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Amizades = () => {
  const { user } = useAuth();
  const [convites, setConvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFriendRequests();
    }
  }, [user]);

  const fetchFriendRequests = async () => {
    try {
      // Buscar convites
      const { data: friendships, error: friendshipsError } = await supabase
        .from("friendships")
        .select("*")
        .eq("addressee_id", user.id)
        .eq("status", "pending");

      if (friendshipsError) {
        console.error("Erro ao buscar friendships:", friendshipsError);
        throw friendshipsError;
      }

      if (!friendships || friendships.length === 0) {
        setConvites([]);
        return;
      }

      // Buscar perfis dos remetentes
      const requesterIds = friendships.map((f) => f.requester_id);
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", requesterIds);

      if (profilesError) {
        console.error("Erro ao buscar profiles:", profilesError);
        throw profilesError;
      }

      // Combinar dados
      const convitesComPerfis = friendships.map((friendship) => {
        const profile = profiles?.find((p) => p.id === friendship.requester_id);
        return {
          ...friendship,
          profiles: profile,
        };
      });

      setConvites(convitesComPerfis);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("id", id);

      if (error) throw error;
      setConvites(convites.filter((convite) => convite.id !== id));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("friendships")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      setConvites(convites.filter((convite) => convite.id !== id));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-32 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Convites de Amizade
        </h1>

        {convites.length === 0 ? (
          <Card className="p-8 text-center">
            <i className="fas fa-users text-4xl text-slate-400 mb-4"></i>
            <h2 className="text-xl font-semibold text-slate-600 mb-2">
              Nenhum convite pendente
            </h2>
            <p className="text-slate-500">
              Você não tem convites de amizade no momento.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {convites.map((convite) => (
              <Card key={convite.id} className="p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={convite.profiles?.avatar_url || "/img/usuario.png"}
                    alt={convite.profiles?.full_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-1">
                      {convite.profiles?.full_name || "Usuário"}
                    </h3>
                    <p className="text-slate-600 mb-2">
                      {convite.profiles?.bio ||
                        "Desenvolvedor na comunidade Adventus"}
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      Enviado em{" "}
                      {new Date(convite.created_at).toLocaleDateString()}
                    </p>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAccept(convite.id)}
                        className="px-6 py-2"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Aceitar
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleReject(convite.id)}
                        className="px-6 py-2"
                      >
                        <i className="fas fa-times mr-2"></i>
                        Recusar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Amizades;
