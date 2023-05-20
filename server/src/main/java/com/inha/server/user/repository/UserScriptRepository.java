package com.inha.server.user.repository;

import com.inha.server.user.model.UserScriptList;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserScriptRepository extends MongoRepository<UserScriptList, String> {

    Optional<UserScriptList> findByUserIdAndLanguageId(String userId, String languageId);
}
