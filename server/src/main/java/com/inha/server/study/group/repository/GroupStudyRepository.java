package com.inha.server.study.group.repository;

import com.inha.server.study.group.model.GroupStudy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupStudyRepository extends MongoRepository<GroupStudy, String> {

  @Override
  Page<GroupStudy> findAll(Pageable pageable);
}
