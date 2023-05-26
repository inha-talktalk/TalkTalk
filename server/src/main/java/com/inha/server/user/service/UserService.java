package com.inha.server.user.service;

import com.inha.server.user.model.User;
import com.inha.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void addLanguage(String userId, String languageId) {
        User user = userRepository.findById(userId).get();

        if (user.getLanguageList().contains(languageId)) {
            return;
        }

        user.addLanguage(languageId);

        userRepository.save(user);
    }
}
