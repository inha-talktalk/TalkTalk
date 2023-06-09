package com.inha.server.study.self.repository;

import com.inha.server.study.self.model.SelfStudyShare;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SelfStudyShareRepository extends MongoRepository<SelfStudyShare, String> {
    Optional<List<SelfStudyShare>> findAllByGroupIdOrderBySharedAtAsc(String groupStudyId);
}