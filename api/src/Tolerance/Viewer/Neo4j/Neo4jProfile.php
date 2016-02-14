<?php

namespace Tolerance\Viewer\Neo4j;

use Tolerance\MessageProfile\Identifier\StringMessageIdentifier;
use Tolerance\MessageProfile\MessageProfile;
use Tolerance\MessageProfile\SimpleMessageProfile;
use Tolerance\MessageProfile\Timing\SimpleMessageTiming;

class Neo4jProfile extends SimpleMessageProfile
{
    /**
     * @var array
     */
    private $message;

    /**
     * @var array
     */
    private $parent;

    /**
     * @param array $normalized
     *
     * @return MessageProfile
     */
    public static function fromQueryResult(array $normalized)
    {
        if (!array_key_exists('message', $normalized)) {
            throw new \InvalidArgumentException('Missing the `message` attribute');
        }

        $normalizedMessage = $normalized['message'];
        $profile = new self(
            StringMessageIdentifier::fromString($normalizedMessage['identifier']),
            isset($normalized['sender']) ? Peer::fromNormalized($normalized['sender']) : null,
            isset($normalized['receiver']) ? Peer::fromNormalized($normalized['receiver']) : null,
            $normalizedMessage['context']
        );

        if (null !== ($timing = self::timingFromQuery($normalized))) {
            $profile = $profile->withTiming($timing);
        }

        if (isset($normalized['parent'])) {
            $parentIdentifier = StringMessageIdentifier::fromString($normalized['parent']['identifier']);
            $profile = $profile->withParentIdentifier($parentIdentifier);
            $profile->parent = $normalized['parent'];
        }

        $profile->message = $normalized['message'];

        return $profile;
    }

    /**
     * @param array $normalized
     *
     * @return null|SimpleMessageTiming
     */
    private static function timingFromQuery(array $normalized)
    {
        $start = [];
        $end = [];

        if (array_key_exists('received', $normalized)) {
            $start[] = $normalized['received']['start'];
            $end[] = $normalized['received']['end'];
        }

        if (array_key_exists('sent', $normalized)) {
            $start[] = $normalized['sent']['start'];
            $end[] = $normalized['sent']['end'];
        }

        if (count($start) == 0) {
            return null;
        }

        $start = min($start) / 1000;
        $end = max($end) / 1000;
        if (empty($start) || empty($end)) {
            return null;
        }

        return SimpleMessageTiming::fromRange(
            \DateTime::createFromFormat('U.u', (string) $start),
            \DateTime::createFromFormat('U.u', (string) $end)
        );
    }
}
