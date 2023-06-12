package com.inha.server.study.self.repository;

import com.inha.server.study.self.dto.reponse.SelfStudySimpleListRes;
import com.inha.server.study.self.model.SelfStudy;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelfStudyRepository extends MongoRepository<SelfStudy, String> {

    List<SelfStudy> findAllByUserId(String userId);

    List<SelfStudySimpleListRes> findAllByUserIdAndIsFinished(String s, boolean b, Pageable pageReq);
}
