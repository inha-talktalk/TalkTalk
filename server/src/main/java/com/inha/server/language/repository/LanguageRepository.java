package com.inha.server.language.repository;

import com.inha.server.language.model.Language;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends MongoRepository<Language, String> {

    Optional<Language> findByName(String label);
}
