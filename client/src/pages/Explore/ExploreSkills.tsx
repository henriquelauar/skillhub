import Layout from "../../components/layout/Layout";
import AnimatedPage from "../../components/layout/AnimatedPage";
import UserMatchCard from "../../components/UserMatchCard";
import SearchBar from "./SearchBar";
import { FaSearch } from "react-icons/fa";
import { useExplore } from "./useExplore";

const ExploreSkills = () => {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleMatch,
    groupedResults,
    matchedUsersByName,
    loading,
    mySkills,
  } = useExplore();

  return (
    <AnimatedPage>
      <Layout title="Explorar">
        <div className="container py-4">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />

          <div className="bg-white rounded-2xl shadow p-4">
            {loading ? (
              <div className="text-center py-5">Carregando...</div>
            ) : matchedUsersByName.length === 0 && Object.keys(groupedResults).length === 0 ? (
              <div className="text-center text-muted py-5">
                <FaSearch size={48} className="mb-3" />
                <h6 className="fs-5 fw-semibold">Nenhum resultado encontrado</h6>
                <p className="mb-0">Tente usar outro nome ou habilidade.</p>
              </div>
            ) : (
              <>
                {matchedUsersByName.length > 0 && (
                  <div className="mb-5">
                    <h5 className="fw-bold text-success mb-3">Usuários</h5>
                    <div className="row g-3">
                      {matchedUsersByName.map((user) =>
                        user.skills?.map((skill) => (
                          <div key={`${user.id}-${skill.id}`} className="col-12 col-sm-6 col-lg-4">
                            <UserMatchCard
                              userId={user.id}
                              name={user.name}
                              email={user.email}
                              skillName={skill.name}
                              isLearning={skill.isLearning}
                              isMatched={false}
                              onMatch={() => handleMatch(user.id, skill.name)}
                              mySkills={mySkills}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {Object.entries(groupedResults).map(([skillName, data]) => (
                  <div key={skillName} className="mb-5">
                    <h5 className="fw-bold text-primary mb-3">{skillName}</h5>
                    <div className="row g-3">
                      {data.map(({ user, skill }) => (
                        <div key={`${user.id}-${skill.id}`} className="col-12 col-sm-6 col-lg-4">
                          <UserMatchCard
                            userId={user.id}
                            name={user.name}
                            email={user.email}
                            skillName={skill.name}
                            isLearning={skill.isLearning}
                            isMatched={false}
                            onMatch={() => handleMatch(user.id, skill.name)}
                            mySkills={mySkills}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Layout>
    </AnimatedPage>
  );
};

export default ExploreSkills;
