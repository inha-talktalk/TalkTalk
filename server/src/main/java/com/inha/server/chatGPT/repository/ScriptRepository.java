package com.inha.server.chatGPT.repository;

import com.inha.server.chatGPT.model.Script;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScriptRepository extends MongoRepository<Script, String> {

    List<Script> findAllByLanguageAndType(String languageId, String type);
}
