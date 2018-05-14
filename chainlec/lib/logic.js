/**
  * give a vote to candidate
  * @param {org.acme.empty.Vote} Vote - the Vote to be processed
  * @transaction
  */
 async function Vote(voteTransaction) {
    //var currentParticipant = getCurrentParticipant();
    // get vote
    var candidate = voteTransaction.candidate;
    var poll = voteTransaction.poll;
    var voter = voteTransaction.voter;
    let voterID = voter.passportID;
    
    /*let voterQualifiedIdentifier = 'org.acme.empty.Voter#'.concat(voterID);
    if (currentParticipant.getFullyQualifiedIdentifier() !== voterQualifiedIdentifier) {
             throw new Error('Transaction can only be submitted by voter'.concat(voterID));
    }*/
    
    var voters = poll.voters;
    
    let now = Date.now();
    if(now < poll.startDate || now > poll.finishDate) {
        throw new Error('Poll is either not started or already finished');
    }
    
    if(voters.indexOf(voter) > -1) {
      throw new Error('Already voted');
    }
    
   
    //Create New Vote
    let voteID = poll.pollName + '_' + voterID;
    var factory = getFactory();
    var vote = factory.newResource('org.acme.empty', 'ElectionVote', voteID)
    vote.creationDate = Date.now();
    vote.voter = voter;
    vote.candidate = candidate;
    vote.poll = poll;
    await getAssetRegistry('org.acme.empty.ElectionVote').then(function(voteRegistry) {
        return voteRegistry.add(vote)
    });
    
    poll.voters.push(voter);
    // get asset 'org.acme.votenetwork.Candidate'
    return getAssetRegistry('org.acme.empty.Poll').then(function(pollRegistry) {
      getParticipantRegistry('org.acme.empty.Candidate').then(function(candidateRegistry) {
        return candidateRegistry.update(candidate);
      }).catch(function(error) {
        console.log('error updating candidate');
      });
      // update the candidate registry
      return pollRegistry.update(poll);
    });
  }
  
    /**
    * register new voter in the system
    * @param {org.acme.empty.RegisterVoter} registerVoterTx - voter registration tx to be processed
    * @transaction
    */
  async function RegisterVoter(registerVoterTx) {
      let voterPassportID = registerVoterTx.passportID;
      let voterPassword = registerVoterTx.password;
    
      await getParticipantRegistry('org.acme.empty.Voter').then(function(voterRegistry) {
           return voterRegistry.exists(voterPassportID)
         }).then(function(exists) {
              if(!exists) {
                  var factory = getFactory();
                  var voter = factory.newResource('org.acme.empty', 'Voter', voterPassportID)
                  voter.password = voterPassword;
                  return getParticipantRegistry('org.acme.empty.Voter').then(function(registry) {
                      return registry.add(voter)
                  });
              } else {
                  throw Error('Voter is already registered')
              }
          }
      )
  }

/**
    * register new candidate in the system
    * @param {org.acme.empty.RegisterCandidate} registerCandidateTx - candidate registration tx to be processed
    * @transaction
    */
  async function RegisterCandidate(registerCandidateTx) {
      let candPassportID = registerCandidateTx.passportID;
      let candPassword = registerCandidateTx.password;
    
      await getParticipantRegistry('org.acme.empty.Candidate').then(function(candRegistry) {
           return candRegistry.exists(candPassportID)
         }).then(function(exists) {
              if(!exists) {
                  var factory = getFactory();
                  var candidate = factory.newResource('org.acme.empty', 'Candidate', candPassportID)
                  candidate.password = candPassword;
                  return getParticipantRegistry('org.acme.empty.Candidate').then(function(registry) {
                      return registry.add(candidate)
                  });
              } else {
                  throw Error('Voter is already registered')
              }
          }
      )
  }
  
    /**
     * create new poll in the system
     * @param {org.acme.empty.CreatePoll} createPollTx - create poll tx to be processed
     * @transaction
     */
    async function CreatePoll(createPollTx) {
        let pollCandidates = createPollTx.candidates;
  
        var factory = getFactory();
        var poll = factory.newResource('org.acme.empty', 'Poll', createPollTx.pollName)
        poll.pollName = createPollTx.pollName;
        poll.creationDate = Date.now();
        poll.startDate = createPollTx.startDate;
        poll.finishDate = createPollTx.finishDate;
        poll.candidates = pollCandidates;
        poll.voters = [];
        return getAssetRegistry('org.acme.empty.Poll').then(function(pollRegistry) {
            return pollRegistry.add(poll)
        });
    }