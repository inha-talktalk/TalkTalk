package com.inha.server.study.self.repository;

import com.inha.server.study.self.model.SelfStudy;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelfStudyRepository extends MongoRepository<SelfStudy, String> {

    List<SelfStudy> findAllByUserId(String userId);
}
