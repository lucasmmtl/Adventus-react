import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const EncontrarPessoas = () => {
  const { user } = useAuth();
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendships, setFriendships] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPessoas();
      fetchFriendships();
    }
  }, [user]);

  const fetchPessoas = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id)
        .limit(10);

      if (error) throw error;
      setPessoas(data || []);
    } catch (error) {
      console.error("Error fetching people:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendships = async () => {
    try {
      const { data, error } = await supabase
        .from("friendships")
        .select("*")
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) throw error;
      setFriendships(data || []);
    } catch (error) {}
  };

  const enviarConvite = async (addresseeId) => {
    try {
      const { data, error } = await supabase
        .from("friendships")
        .insert([
          {
            requester_id: user.id,
            addressee_id: addresseeId,
          },
        ])
        .select();

      if (error) throw error;

      alert("Convite enviado com sucesso!");
      fetchFriendships();
    } catch (error) {
      alert("Erro ao enviar convite: " + error.message);
    }
  };

  const removerAmizade = async (friendId) => {
    if (!confirm("Tem certeza que deseja remover esta amizade?")) return;

    setUpdating(true);
    try {
      const friendship = friendships.find(
        (f) =>
          (f.requester_id === user.id && f.addressee_id === friendId) ||
          (f.addressee_id === user.id && f.requester_id === friendId)
      );

      if (friendship) {
        // Tentar delete com múltiplas condições
        const { data, error } = await supabase
          .from("friendships")
          .delete()
          .eq("id", friendship.id)
          .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
          .select();

        // Se não conseguiu deletar, tentar atualizar status
        if (!data || data.length === 0) {
          const { data: updateData, error: updateError } = await supabase
            .from("friendships")
            .update({ status: "rejected" })
            .eq("id", friendship.id)
            .select();

          if (updateError) throw updateError;
        }

        if (error) throw error;

        // Remover imediatamente do estado local
        setFriendships((prev) => prev.filter((f) => f.id !== friendship.id));

        alert("Amizade removida com sucesso!");

        // Recarregar após um delay para garantir sincronização
        setTimeout(() => {
          fetchFriendships();
        }, 500);

        setUpdating(false);
      } else {
        alert("Amizade não encontrada!");
      }
    } catch (error) {
      console.error("Erro ao remover amizade:", error);
      alert("Erro ao remover amizade: " + error.message);
      setUpdating(false);
    }
  };

  const getFriendshipStatus = (personId) => {
    const friendship = friendships.find(
      (f) =>
        (f.requester_id === user.id && f.addressee_id === personId) ||
        (f.addressee_id === user.id && f.requester_id === personId)
    );

    if (!friendship) return "none";
    return friendship.status;
  };

  if (loading) {
    return (
      <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter text-slate-800 bg-slate-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-32 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Encontrar Pessoas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pessoas.map((pessoa) => (
            <Card key={pessoa.id} className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={pessoa.avatar_url || "/img/usuario.png"}
                  alt={pessoa.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">
                    {pessoa.full_name || "Usuário"}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {pessoa.bio || "Desenvolvedor na comunidade Adventus"}
                  </p>

                  {(() => {
                    const status = getFriendshipStatus(pessoa.id);

                    if (status === "accepted") {
                      return (
                        <Button
                          onClick={() => removerAmizade(pessoa.id)}
                          variant="secondary"
                          size="sm"
                          disabled={updating}
                        >
                          <i className="fas fa-user-check mr-2"></i>
                          {updating ? "Removendo..." : "Amigos"}
                        </Button>
                      );
                    } else if (status === "pending") {
                      return (
                        <Button disabled variant="secondary" size="sm">
                          <i className="fas fa-clock mr-2"></i>
                          Pendente
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          onClick={() => enviarConvite(pessoa.id)}
                          size="sm"
                        >
                          <i className="fas fa-user-plus mr-2"></i>
                          Enviar Convite
                        </Button>
                      );
                    }
                  })()}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {pessoas.length === 0 && (
          <Card className="p-8 text-center">
            <i className="fas fa-users text-4xl text-slate-400 mb-4"></i>
            <h2 className="text-xl font-semibold text-slate-600 mb-2">
              Nenhuma pessoa encontrada
            </h2>
            <p className="text-slate-500">
              Não há mais pessoas para adicionar no momento.
            </p>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EncontrarPessoas;
