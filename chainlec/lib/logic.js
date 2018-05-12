'use strict';
/**
  * give a vote to candidate
  * @param {org.acme.chainlec} Vote - the Vote to be processed
  * @transaction
  */
 async function Vote(vote) {
    // get voter
    var voter = vote.voter;
    // get candidate
    var candidate = vote.candidate;
    // if voter already voted
    var poll = vote.poll;
    var voters = poll.voters;
    if(voters.indexOf(voter) > -1) {
      throw new Error('Already voted');
    }
    // if voter has not voted give a vote to candidate
    candidate.numberOfVotes += 1;
    poll.voters.push(voter);
    // get asset 'org.acme.votenetwork.Candidate'
    return getAssetRegistry('org.acme.votenetwork.Candidate').then(function(CandidateRegistry) {
      // Get participant 'org.acme.votenetwork.Voter'
      getParticipantRegistry('org.acme.votenetwork.Voter').then(function(participantRegistry) {
        // Modify the properties of the voter .
        voter.voted = true;
        // Update the voter in the participant registry.
        return participantRegistry.update(voter);
      }).catch(function(error) {
        // Add optional error handling here.
      });
      // update the candidate registry
      return CandidateRegistry.update(candidate);
    });
  }