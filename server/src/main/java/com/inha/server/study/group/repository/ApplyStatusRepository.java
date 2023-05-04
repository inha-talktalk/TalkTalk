package com.inha.server.study.group.repository;

import com.inha.server.study.group.model.ApplyStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyStatusRepository extends MongoRepository<ApplyStatus, String> {

    Optional<ApplyStatus> findByUserId(String userId);

    Optional<ApplyStatus> findByUserIdAndGroupId(String userId, String groupStudyId);

    List<ApplyStatus> findAllByUserIdAndAccepted(String userId, boolean accepted);
}
