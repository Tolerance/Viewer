<?php

namespace Tolerance\Viewer;

interface Inspector
{
    /**
     * Run an inspection from the given request.
     *
     * @param InspectionRequest $request
     *
     * @return Inspection
     */
    public function inspect(InspectionRequest $request): Inspection;
}
